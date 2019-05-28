import 'reflect-metadata';

const validateCountryMetadataKey = Symbol('validateCountry');

export function validateCountry(target, propertyKey: string | symbol, parameterIndex: number) {
  // get all the parameters that have a @validate decorator defined on the current MetaData
  const existingValidateCountryParameters: number[] = Reflect.getOwnMetadata(validateCountryMetadataKey, target, propertyKey) || [];

  existingValidateCountryParameters.push(parameterIndex);

  // Define a unique metadata entry on the target
  Reflect.defineMetadata(validateCountryMetadataKey, existingValidateCountryParameters, target, propertyKey);
}

export function isViking(countries = []) {
  return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    // put the original method on a const for later use
    const method = descriptor.value;
    let isRealViking = true;

    // assign a new implementation to the descriptor value
    descriptor.value = function () {

      // search within the current MetaData for params with @validateCountry decorator
      const parametersWithValidateCountryDecorator: number[] = Reflect.getOwnMetadata(validateCountryMetadataKey, target, propertyName);

      if (parametersWithValidateCountryDecorator && countries) {
        for (const parameterIndex of parametersWithValidateCountryDecorator) {
          const countryToValidate = arguments[parameterIndex].toLowerCase();
          isRealViking = !!countries.find((country) => country.toLowerCase() === countryToValidate);
        }

        if (!isRealViking) {
          return `You are not a real viking! Real vikings are born in: ${countries.join(', ')}`
        }
      }

      // when everything goes well just execute the original method
      return method.apply(this, arguments);
    };
  }
}

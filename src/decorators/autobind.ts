export function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    }
  }
  return adjDescriptor;
}
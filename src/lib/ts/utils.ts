export class Optional<T> {
    private readonly hasValue: boolean;
    private readonly value: T;
    
    private constructor(hasValue: boolean, value: T) {
        this.hasValue = hasValue;
        this.value = value;
    }
    
    public ifPresent(run: (T) => {}) {
        if (this.hasValue) run(this.value)
    }
    
    public map<R>(mapper: (T) => R): Optional<R> {
        if (this.hasValue) return Optional.some(mapper(this.value));
        return Optional.none();
    }
    
    public getOr(defaultVal: T): T {
        return this.hasValue ? this.value : defaultVal;
    }
    
    public static some<T>(value: T): Optional<T> {
        return new Optional<T>(true, value);
    }
    
    public static none<T>(): Optional<T> {
        return new Optional<T>(false, null);
    }
}
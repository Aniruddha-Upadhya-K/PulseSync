const debounce = (fn: Function, wait = 1000) => {
    let timeout: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
        const context = this;

        const later = () => {
            fn.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
       
export default debounce;
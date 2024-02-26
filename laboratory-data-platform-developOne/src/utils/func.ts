export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): T {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: Parameters<T>) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    } as T;
}

export function setTitle(subTitle: string = '') {
    document.title = subTitle ? `${subTitle} - 广东工业大学运动会编排系统` : "广东工业大学运动会编排系统"
}

export function getToken(): string | null {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // 检查cookie是否以 "satoken" 开头
        if (cookie.startsWith("satoken=")) {
            // 获取等号后面的值作为token并返回
            return cookie.substring("satoken=".length, cookie.length);
        }
    }

    // 如果未找到对应的cookie，返回null
    return null;
}

export function removeAllCookies() {
    // 获取所有的cookie键名
    const cookies = document.cookie.split(";");

    // 遍历所有cookie并删除
    cookies.forEach(cookie => {
        const cookieParts = cookie.split("=");
        const cookieName = cookieParts[0].trim();

        // 使用过期时间将cookie删除
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}
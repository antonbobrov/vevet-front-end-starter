import { OpenServerDomain } from '../../settings';

export function isLocalHost (): boolean {

    const is = Boolean(
        location.hostname === OpenServerDomain
        || location.hostname === 'localhost'
        // location.hostname === '192.168.0.102' ||
        // [::1] is the IPv6 localhost address.
        || location.hostname === '[::1]'
        // 127.0.0.1/8 is considered localhost for IPv4.
        || location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
        ),
    );

    return is;

}

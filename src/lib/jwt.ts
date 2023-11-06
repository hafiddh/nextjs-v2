import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "1h",
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (secretKey) {
        const token = jwt.sign(payload, secretKey, options);
        return token;
    } else {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
}

export function verifyJwt(token: string) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;

        if (secretKey) {
            const decoded = jwt.verify(token, secretKey);
            return decoded as JwtPayload;
        } else {
            throw new Error("JWT_SECRET_KEY is not defined");
        }
    } catch (error) {
        console.error(error);
    }
}
const SERVER_BASE = "http://localhost:8080/";
const GRAPHQL_URL = SERVER_BASE + "ql";


//this reflect the server side enum ErrorCode
export const ERROR_CODE = {
    UNKNOWN:0,
    USER_ALREADY_EXISTS: 1,
    USER_NOT_EXISTS: 2,
    WRONG_PASSWORD: 3,
};


export default class GraphQL {
    static run(query, params) {
        return fetch(GRAPHQL_URL, {
            method:"POST",
            body: JSON.stringify({
                query:query,
                params:params || {}
            }),
            mode:"cors",
            credentials:"include"
        }).then(resp => resp.json());
    }


    static getFirstErrorMessage(errors) {
        if (!errors || !errors[0]) return null;
        return errors[0].message;
    }

    static getFirstErrorCode(errors) {
        if (!errors || !errors[0] || !errors[0].extensions) return ERROR_CODE.UNKNOWN;
        return errors[0].extensions.code;
    }
}
function getErrorJson(status, msg) {
    return {
        status: status,
        errors: [msg]
    };
}

export default getErrorJson;
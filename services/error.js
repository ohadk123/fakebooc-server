function getErrorJson(status, errors) {
    return {
        status: status,
        errors: errors
    };
}

export default getErrorJson;
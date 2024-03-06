import getErrorJson from "../services/error.js";

function authorizeRequest(loggedUsername, accessUsername) {
    if (loggedUsername !== accessUsername)
        return getErrorJson(401, ["Unauthorized access"]);
}

function runController(data, res) {
    if (data.status)
        return res.status(data.status).json({errors: data.errors});

    res.status(200).json(data);
}

export default {authorizeRequest, runController};
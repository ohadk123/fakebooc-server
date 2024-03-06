async function runController(loggedUsername, accessUsername, data, res) {
    if (loggedUsername !== accessUsername)
        return res.status(401).json({errors: ["Unauthorized access"]});

    if (data.status)
        return res.status(data.status).json({errors: data.errors});

    res.status(200).json(data);
}

export default runController;
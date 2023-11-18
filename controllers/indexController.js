export const getDefaultMessage = (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: 'Hello, World!'
        });
    }
    catch(error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
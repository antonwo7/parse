class Controller {
    error = (res, e) => {
        !(e instanceof Error) && (e = new Error(e))
        res.status(200).json({ success: false, message: e.message })
    }

    success = (res, value) => {
        res.status(200).json({ success: true, data: value })
    }

    unsuccess = (res, value) => {
        res.status(200).json({ success: false, data: value })
    }
}

module.exports = Controller
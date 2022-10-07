exports.sucessResponse = (code, message, data) => {

    let json = {
        code: code,
        message: message,
        data: data,
    }
    return json;

};
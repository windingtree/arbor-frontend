module.exports.phone = /^([+]{0,1})([0-9- ]+)$/;
module.exports.url = /^(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)$/;
module.exports.email = /^[\w.-]+@[0-9a-zA-Z._-]+?\.[a-zA-Z]{2,3}$/;
module.exports.at = /^@[0-9a-zA-Z._-]+$/;
module.exports.discord = /^[0-9a-zA-Z._-]+#\d+$/;
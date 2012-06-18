function invoke(req, res, id) {
  res.send(200, {}, {name: "example"});
}

exports.invoke = invoke;

const bookrepo = require("../repositories/bookrepo");

const getAll = async (req, res) => {
  const currentpage = req.params.page || 1;
  const pagesize = req.params.limit || 10;
  const search = req.query.search || "";
  const sort = req.query.sort || "publishYear";
  const order = req.query.order || "desc";
  const recordstoskip = (currentpage - 1) * pagesize;
  try {
    const count = await bookrepo.count(search); // to count the length of the
    const totalpages = Math.ceil(count / pagesize);
    const metadata = { count, totalpages, currentpage };
    const parameters = {
      recordstoskip,
      pagesize,
      search,
      sort,
      order,
    };
    const data = await bookrepo.getAll(parameters);
    const response = { metadata, data };
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await bookrepo.getById(id);
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: error.message });
  }
};
const preparevalidationerr=(errors)=>{
  const msg=[];
  for(let key in errors){
    msg.push(errors[key].message)
  }
  return msg;
}
const post = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all the required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const savedBook = await bookrepo.create(newBook);
    res.status(201).send(savedBook);
  } catch (err) {
    // res.status(400).send(err)
    if (err.message.indexOf('ValidatorError' >-1) ) {
      return res
        .status(400)
        .send(preparevalidationerr(err.errors));
    } else {
      res.status(500).send({ message: 'internal server error'});
    }
  }
};
const put = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all the required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const body = req.body;
    const books = await bookrepo.put(id, body);
    // res.status(200).json(books);// ek time pe ek ich response reh sakta
    if (!books) {
      res.status(404).json({ message: "book not found" });
    }
    res.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await bookrepo.remove(id);
    if (!books) {
      return res.status(400).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book deleted successfully" });
    // res.status(200).json(books);// ek time pe ek ich response reh sakta
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
module.exports = { getAll, getById, post, put, remove };

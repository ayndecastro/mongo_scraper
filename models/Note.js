const mongoose = require("mongoose");


let Schema = mongoose.Schema;

const notesSchema = new Schema({
   _headlineId: {
       type: Schema.Types.ObjectId,
       ref: "Article"
   },
   date: {
       type: String
   },
   noteText:{
       String
   }
});
let Note = mongoose.model("Note", notesSchema);
module.exports = Note;
const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const Schema = mongoose.Schema
const articleSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // }  
})

// articleSchema.pre('validate', function(){
//     if (this.title){
//         this.slug = slugify(this.title, { lower: true, strict: true})
//     }
//     if (this.markdown){
//         this.sanitizedHtml = dompurify.sanitize (marked(this.markdown))
        
//     next()
//         }
//     })       
    

module.exports = mongoose.model('Article', articleSchema)
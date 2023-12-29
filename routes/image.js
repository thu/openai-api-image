const express = require('express');
const router = express.Router();

const {OpenAI} = require('openai')

const openai = new OpenAI({
    apiKey: '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'
})

router.post('/', (req, res) => {
    console.log(gen(req, res));
});

async function gen(req, res) {
    const {prompt, size} = req.body;
    console.log(prompt, size);

    const response = await openai.images.generate({
        prompt: prompt,
        size: size,
        model: 'dall-e-3',
        quality: 'hd',
        style: 'natural'
    });
    let revisedPrompt = response.data[0].revised_prompt;
    let url = response.data[0].url;
    console.log(response.data);
    res.status(200).json({
        success: true,
        revisedPrompt: revisedPrompt,
        url: url
    })
}

module.exports = router;

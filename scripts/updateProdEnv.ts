import fs from "fs";

const HF_TOKEN = process.env.HF_TOKEN; // token used for pushing to hub

const SERPER_API_KEY = process.env.SERPER_API_KEY;
const OPENID_CONFIG = process.env.OPENID_CONFIG;
const PUBLIC_MONGODB_URL = process.env.PUBLIC_MONGODB_URL;
const PUBLIC_HF_ACCESS_TOKEN = process.env.PUBLIC_HF_ACCESS_TOKEN; // token used for API requests in prod

// Read the content of the file .env.template
const PUBLIC_CONFIG = fs.readFileSync(".env.template", "utf8");

// Prepend the content of the env variable SECRET_CONFIG
const full_config = `${PUBLIC_CONFIG}
PUBLIC_MONGODB_URL=${PUBLIC_MONGODB_URL}
OPENID_CONFIG=${OPENID_CONFIG}
SERPER_API_KEY=${SERPER_API_KEY}
PUBLIC_HF_ACCESS_TOKEN=${PUBLIC_HF_ACCESS_TOKEN}
`;

// Make an HTTP POST request to add the space secrets
fetch(`https://huggingface.co/api/spaces/huggingchat/chat-ui/secrets`, {
	method: "POST",
	body: JSON.stringify({
		key: "DOTENV_LOCAL",
		value: full_config,
		description: `Env variable for HuggingChat. Last updated ${new Date().toISOString()}`,
	}),
	headers: {
		Authorization: `Bearer ${HF_TOKEN}`,
		"Content-Type": "application/json",
	},
});

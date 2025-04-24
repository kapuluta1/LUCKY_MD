const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || ' LUCKY-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUQxcURJd2V2Q1B4VU9WMDJnYjdhSzRjR1ZxYlk5YVNHZUhSUTg4OFNHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2M1TUkwZkxER0FER1NId1M0ZUtYeDN5T3pONXdiTEczdS8yVnJJT3Rraz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRWxEbTdrdnI1dHBnY256L2NoRnJZUTV4QkIrN2didjdlSkVwUmZ0azFnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnKzY1TW0zYlRlTVphM0M0U3FnRnNGNVN6NTdCTEFBbC84K0MxNHhLNm44PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFKdWJGMGR4alI2a2lJbkE2RDFTd1FKQ3cxNjJad0YzOVc1TjRkbXA1bXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndQUjN2dnJieDJ1dDVWa0gxb2UxMzMzclFNUkp5Y0pna2hKcks5ekRaSFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUg0aXE4UDZCWjN5Y0tGelBvQzM4MEFzdlZ2dS8ydllpZjFrNDFybFYzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VCYXJHbDlMSGxUOWkrQ3JPNlZ3R2dKZjV1MjdDRUxKVmFsc2gvSVZrVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imx3Vi9BcUhJSi9NTUFPb0NTclZPM3poYUV3Tnl5UXI3MkZEY25yaUVUY1hNd0lLL3VwejY5dXRSbUEyeVZnQThxRmhjTm5wQVRLbU8xQU5KSTZuSGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiJlNWpXS1dtVkJSa1FLVyswVm4xN2VVbnhBSzhXdnVmc3NlT3lPK3NtUjdBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFQzJ5NjZ5ZlJkaXMtX3p6MEVzWDNRIiwicGhvbmVJZCI6ImU4NzUxODdlLWJmMjUtNDZlYS05NWZlLWU2MmI3ZDNiMDQwOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjNHVtaHdpcjRpRWxyMHJXU3lORmdWZzRJem89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFpjMHBMQ1lGRGpwMmpZSE9UNDBLQ3FYZjF3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZKWktDWjgzIiwibWUiOnsiaWQiOiIyNTU3ODk2MjIzNDE6MTlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiZW1lcml0dXMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xUMXFJY0dFTExocHNBR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxQMmhRdnlyblJ6REUwTkZUS005ZmQyc0lMQ2lRTlNjcGJETkVmdmhsVlk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNtdlJLaUM1RzJBSUhKZGQ4cHV6SnBnVVMydExYeVkvNzh4aUVobVl4bEFYbUVuNFlqSkJjZ0RwMzlWanpiNUxwQXJEY1lKbjNvVEhFcXN5bUI0OERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJjb243cG9zcVMyUlFuT0VSWGtnU1ZpdnNLM2g4eWdkaUYyT2Y5K0tMV0FxdDdaZnZCSVlMTnNEZW9GUUZHQndySWxPdGZiM3ozYy9zemlrQnNFZ1BpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc4OTYyMjM0MToxOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTejlvVUw4cTUwY3d4TkRSVXlqUFgzZHJDQ3dva0RVbktXd3pSSDc0WlZXIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NDY1NTM1fQ== ',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "emeritus",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255789622341",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by emeritus',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


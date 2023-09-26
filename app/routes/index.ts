import express from "express";
import path from 'path';

const router = express.Router();
let url = "https://bigid.com/";
let name = "External URL";


const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
const handle = route => (req, res, next = console.error) => Promise.resolve(route(req, res)).catch(next)

router.post('/execute', handle(async (req, res) => {
    let tmpurl = req.body.actionParams[0].paramValue;
    let tmpname = req.body.actionParams[1].paramValue;

    if (tmpurl === url && tmpname === name) {
        return res.send({
            'statusEnum': 'COMPLETED',
            'executionId': req.body.executionId,
            'progress': 1,
            'message': "Nothing to change! Parameters matched"
        });
    }

    let changed = [];

    if (tmpname !== name) {
        name = tmpname;
        changed.push('Name');
    }

    if (tmpurl !== url) {
        if (tmpurl.match(regex)) {
            changed.push('URL');
            url = tmpurl;
        } else {
            return res.send({
                'statusEnum': 'ERROR',
                'executionId': req.body.executionId,
                'progress': 1,
                'message': "Invalid URL supplied. be sure to include http"
            });
        }
    }
    return res.send({
        'statusEnum': 'COMPLETED',
        'executionId': req.body.executionId,
        'progress': 1,
        'message': changed.join() + " changed successfully!" + (changed.includes('Name') ? ' Update app to see name changes!' : '')
    });

}));

router.get('/logs', async (req, res) => {
    res.sendFile('/app.log', { root: path.join(__dirname, '../') });
});

router.get('/manifest', async (req, res) => {
    let logger = req.app.get('logger');
    logger.info("Manifest touched!");
    res.json({
        "app_name": name,
        "description": "Launch " + name,
        "category": "privacy",
        "vendor": "BigID",
        "is_interactive": true,
        "actions": [
            {
                "action_id": "updateURL",
                "description": "Update URL to redirect users",
                "is_sync": true,
                "action_params": [
                    {
                        "param_name": "Redirect URL",
                        "param_type": "string",
                        "is_cleartext": true,
                        "param_description": "What URL should we redirect to",
                        "default_value": "https://bigid.com",
                        "param_priority": "primary",
                        "is_mandatory": true
                    },
                    {
                        "param_name": "App Name",
                        "param_type": "string",
                        "is_cleartext": true,
                        "param_description": "What should our app be named",
                        "default_value": "External URL",
                        "param_priority": "primary",
                        "is_mandatory": true
                    }
                ]
            }
        ],
        "global_params": []
    })
});

router.get('/ui', async (req, res) => {

    res.send(`
    <html>

<head>
    <link rel="stylesheet" href="/ui/style.css">
</head>

<body>
    This application has opened in a new tab. If you don't see it, <a href="${url}" target="_blank">click here</a>.
    <script>
        window.open("${url}");
    </script>
</body>

</html>
    `);
});

export default router;
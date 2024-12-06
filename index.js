const https = require('https');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const sources = [
    {
        name: 'Hackertarget',
        url: (domain) => `https://api.hackertarget.com/hostsearch/?q=${domain}`
    },
    {
        name: 'VirusTotal',
        url: (domain) => `https://www.virustotal.com/api/v3/domains/${domain}/subdomains`
    },
    {
        name: 'Shodan',
        url: (domain) => `https://api.shodan.io/shodan/host/search?key=<YOUR_SHODAN_API_KEY>&query=hostname:${domain}`
    },
    {
        name: 'Censys',
        url: (domain) => `https://search.censys.io/api/v1/search/certificates?q=parsed.names:${domain}&page=1`
    },
    {
        name: 'Pentest-Tools',
        url: (domain) => `https://pentest-tools.com/api/subdomain-scanner/${domain}`
    },
    {
        name: 'DNSdumpster',
        url: (domain) => `https://dnsdumpster.com/api/subdomains/${domain}`
    },
    {
        name: 'Spyse',
        url: (domain) => `https://api.spyse.com/v4/data/subdomains/${domain}`
    },
    {
        name: 'SecurityTrails',
        url: (domain) => `https://api.securitytrails.com/v1/domain/${domain}/subdomains`
    }
];

rl.question("[*] SITE -> ", function(td) {
    if (td) {
        sources.forEach(source => {
            const url = source.url(td);
            https.get(url, (response) => {
                let data = '';

                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', () => {
                    console.log(`\n[*] subdomains from ${source.name}:`);
                    console.log(data);
                    console.log('\n-----------------------------------------');
                });
            }).on("error", (err) => {
                console.log(`[*] err retrieving data from ${source.name}`);
            });
        });

        setTimeout(() => {
            console.log(`\n[ GITHUB.COM/INFALLIBLESS ]`);
        }, 8000);
    } else {
        console.log(`\n[*] [ERROR] no site provided`);
        console.log(`\n[GITHUB.COM/INFALLIBLESS]`);
    }

    rl.close();
});

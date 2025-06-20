import Container from "./Container";

function TrustedBy(){
    const logos = [
        {
            name: 'Slack',
            src: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg'
        },
        {
            name: 'Netflix',
            src: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg'
        },
        {
            name: 'Google',
            src: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg'
        },
        {
            name: 'Framer',
            src: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg'
        },
        {
            name: 'Facebook',
            src: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg'
        },
        {
            name: 'Instagram',
            src: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg'
        }
    ]

    return (
        <section>
            <Container className="overflow-hidden mx-5 md:mx-16 lg:mx-24 xl:mx-32">
                <div className="min-w-[200%]">
                    <div className="flex items-center justify-between inner gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
                        {
                            [...logos, ...logos].map(logo => (
                                <img className="h-8 md:h-10" src={logo.src} alt={logo.name} key={logo.name} />
                            ))
                        }
                    </div>
                </div>
                <style>
                    {
                        `
                            .inner{
                                animation: scroll 12s linear infinite
                            }

                            @keyframes scroll{
                                from{
                                    transform: translateX(0%)
                                }
                                to{
                                    transform: translateX(-50%)
                                }
                            }
                        `
                    }
                </style>
            </Container>
        </section>
    );
}

export default TrustedBy;
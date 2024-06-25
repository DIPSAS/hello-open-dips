import Link from "next/link";


type CardProps = {
    icon: string,
    title: string,
    info: string,
    link: string,
}


// TODO: 
// 1. Look into making entire card to link

export default function BlueInfoCard (props: CardProps) {
    const { icon, title, info, link } = props;
    
    
    return (
        <Link href={ link } className="default-link">
            <div className="blue-info-card">
                <div className="text-wrapper">
                    <i className={ icon } />
                    <p className="card-name">
                        { title }
                    </p>
                    <p>
                        { info }
                    </p>
                </div>
            </div>
        </Link>
    )
}
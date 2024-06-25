import Link from "next/link"

const Header: React.FC = () => {

    return(
        <header className="mainHeader">
            <Link href="/searchPatient">
            <div className="logo"></div>
            </Link>
            <a className="float-right" href="https://github.com/DIPSAS/hello-open-dips"><div className="github-logo"></div></a>
        </header>
    );

}

export default Header;
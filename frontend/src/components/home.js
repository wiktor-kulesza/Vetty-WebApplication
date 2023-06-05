import PetList from "./petList";

const Home = () => {
    return (
        <div className="home">
            <PetList passedEmail={localStorage.getItem('userEmail')}/>
        </div>
    );
}

export default Home;
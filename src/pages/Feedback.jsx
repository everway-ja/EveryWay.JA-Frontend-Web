import UserCard from '../ui/UserCard/UserCard';

function Feedback() {
    const feedbacks = [
        {
            id: 1,
            title: "Alexander",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Molto utile per i miei viaggi"
        },
        {
            id: 2,
            title: "Christina",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "App migliore del mondo"
        },
        {
            id: 3,
            title: "Annah",
            image: "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Anche con la mia disabilità è molto utile" },
        {
            id: 4,
            title: "John",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Mi ha fatto scoprire posti nuovi e bellissimi"
        },
        {
            id: 5,
            title: "Alice",
            image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Un'ottima app per pianificare i miei viaggi"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-3xl font-bold mb-6">Feedback</h1>
            <p className="text-lg mb-8 text-center">Send us your feedback</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                {feedbacks.map(feedback => (
                    <UserCard
                        key={feedback.id}
                        title={feedback.title}
                        image={feedback.image}
                        description={feedback.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Feedback;
const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5">
      {children}
    </div>
  );
}

export default Card;
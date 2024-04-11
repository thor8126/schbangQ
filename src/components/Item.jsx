function Item({ book }) {
  const link =
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60";

  return (
    <div className="card bg-base-100 shadow-xl border-1 border-gray-700">
      <figure className="px-1 pt-4">
        <img
          src={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : link}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{book.title}!</h2>
        <p>{book.authors}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Item;

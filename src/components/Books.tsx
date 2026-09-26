import { books } from '../data/books';
import { quotes } from '../data/quotes';

const Books = () => {
  return (
    <section className="section container border-t">
      <div className="text-center max-w-2xl mx-auto mb-24 font-serif text-heading italic text-muted">
        "{quotes.dostoevsky.text}"
        <div className="font-sans text-tiny mt-4 not-italic uppercase tracking-widest text-dim">
          — {quotes.dostoevsky.author}
        </div>
      </div>

      <h2 className="font-mono text-tiny text-muted mb-12">READING BETWEEN BUILDS / AUTHORS I RETURN TO</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book, idx) => (
          <div key={idx} className="group relative border-l border-[#27272a] pl-6 py-2 hover:border-accent transition-colors cursor-crosshair">
            <h3 className="font-serif text-body group-hover:text-accent transition-colors mb-1">{book.title}</h3>
            <div className="font-mono text-tiny text-muted">{book.author}</div>
            
            <div className="absolute top-full left-6 mt-4 p-4 border border-[#27272a] bg-[#0c0c0c] font-serif text-small text-dim opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64 shadow-2xl">
              {book.thought}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Books;

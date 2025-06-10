import { nanoid } from 'nanoid';
import './global.css';
import { toast, ToastRegion } from './toast';

export default function App() {
  return (
    <div className="content">
      <button
        type="button"
        onClick={() => toast({ message: `Hello, world! ${nanoid()}` })}
      >
        Click me to show a toast
      </button>
      <ToastRegion />
    </div>
  );
}

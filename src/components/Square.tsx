export default function Square({ value, onSquareClick }: { value: string; onSquareClick: () => void }): JSX.Element {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

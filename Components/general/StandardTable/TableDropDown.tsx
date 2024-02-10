import { FaSearch } from 'react-icons/fa';
import { useRef } from 'react';

const TableDropDown: React.FC<{
  sortAscendingHandler: () => void;
  sortDescendingHandler: () => void;
  setInputHandler: (inputValue: string) => void;
  exportHandler: () => void;
}> =
  ({ sortAscendingHandler, sortDescendingHandler, setInputHandler, exportHandler }) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const stopClickEvent = (event: React.MouseEvent<HTMLElement>) => {
      // Prevent click event from propagating to the document
      event.stopPropagation();
    };

    const handleButtonClick = () => {
      if (inputRef.current) {
        const inputValue = inputRef.current.value;
        setInputHandler(inputValue);
      }
    }
    return (
      <div className='drop-down' onClick={stopClickEvent}>
        <ul>
          <li style={{ padding: '.25rem .05rem' }} className="drop-down_input">
            <div style={{ display: 'flex', alignItems: 'center' }} >
              <input className='drop-down_input'
                type="text" placeholder="Search"
                style={{ height: "1rem", padding: ".15rem .25rem", maxWidth: '65%' }}
                ref={inputRef}
              />
              <button type="submit"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
                onClick={handleButtonClick}>
                <FaSearch style={{ fontSize: '1rem' }}
                />

              </button></div></li>
          <li onClick={() => sortAscendingHandler()}>Sort A - Z</li>
          <li onClick={() => sortDescendingHandler()}>Sort Z - A</li>
          <li onClick={() => exportHandler()}>Export</li>
        </ul>
      </div>
    )

  }

export default TableDropDown
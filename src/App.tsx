import React, { FormEvent, useState, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button  from '@material-ui/core/Button';
import './App.scss';

const textareaLineHeight = 24;

const App: React.FC = () => {
  /* const [initialValue, setInitialValue] = useState<Array<string>>([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  ]); */
  const [initialValue, setInitialValue] = useState<Array<string>>([]);
  const [layout, showLayout] = useState<boolean>(false);
  const [layoutValue, toggleLayout] = useState<string>('one');
  const [textAreaRows, setTextAreaRows] = useState<number>(3);
  const refs = useRef([
    React.createRef<HTMLTextAreaElement>(),
    React.createRef<HTMLTextAreaElement>(),
    React.createRef<HTMLTextAreaElement>()
  ]);

  function submit(e: FormEvent) {
    e.preventDefault();
    showLayout(true);
  }

  function handleInitialValueChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInitialValue([event.target.value]);
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    setTextAreaRows(currentRows);
  }

  function handleValueChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    setTextAreaRows(currentRows);
  }

  function handleValueBlur(event: React.ChangeEvent<HTMLTextAreaElement>, column: number) {
    const newValue = [...initialValue];
    newValue[column] = event.target.value;
    setInitialValue(newValue);
  }

  function changeLayout(layoutValue: string) {
    let newInitialValue = null;
    let initialValueString = initialValue.join(' ');
    let newValueArr = null;
    switch (layoutValue) {
      case 'two':
        newValueArr = initialValueString.split(' ');
        newInitialValue = [
          newValueArr.slice(0, newValueArr.length / 2).join(' '),
          newValueArr.slice(newValueArr.length / 2, newValueArr.length).join(' ')
        ];
        setInitialValue(newInitialValue);
        break;
      case 'three':
        newValueArr = initialValueString.split(' ');
        newInitialValue = [
          newValueArr.slice(0, newValueArr.length / 3).join(' '),
          newValueArr.slice(newValueArr.length / 3, (newValueArr.length / 3) * 2).join(' '),
          newValueArr.slice((newValueArr.length / 3) * 2, newValueArr.length).join(' ')
        ];
        setInitialValue(newInitialValue);
        break;
      default:
        newInitialValue = [initialValue.join(' ')];
        setInitialValue(newInitialValue);
        break;
    }
    toggleLayout(layoutValue);
  }

  useEffect(() => {
    if (layoutValue === 'one' && refs.current[0].current) {
      refs.current[0].current.value = initialValue[0];
    }
    if (layoutValue === 'two' && refs.current[0].current && refs.current[1].current) {
      refs.current[0].current.value = initialValue[0];
      refs.current[1].current.value = initialValue[1];
    }
    if (layoutValue === 'three' && refs.current[0].current && refs.current[1].current && refs.current[2].current) {
      refs.current[0].current.value = initialValue[0];
      refs.current[1].current.value = initialValue[1];
      refs.current[2].current.value = initialValue[2];
    }
    // set textarea rows every state change
    if (refs.current[0].current) {
      const currentRows = ~~(refs.current[0].current.scrollHeight / textareaLineHeight);
      setTextAreaRows(currentRows);
    }
  }, [layout, layoutValue, initialValue]);

  return (
    <div className="app">
      <h1 className="app-header">Welcome to Nitka test app!</h1>
      <div className="app-body">
        {!layout && (
          <div className="initial-form">
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Please type some text here</label>
                <textarea
                  value={initialValue}
                  onChange={(e) => handleInitialValueChange(e)}
                  name="initialText"
                  rows={textAreaRows}
                />
              </div>
              <Button type="submit">
                Submit
              </Button>
            </form>
          </div>
        )}
        {layout && (
          <div className="layout">
            <h2>You can use buttons to split layout</h2>
            <div className="toggle-layout-buttons">
              <IconButton disabled={layoutValue === 'one'} onClick={() => changeLayout('one')}>1</IconButton>
              <IconButton disabled={layoutValue === 'two'} onClick={() => changeLayout('two')}>2</IconButton>
              <IconButton disabled={layoutValue === 'three'} onClick={() => changeLayout('three')}>3</IconButton>
            </div>
            <div className={`layout-text ${layoutValue}`}>
              { initialValue.map((valItem, index) => (
                <textarea
                  key={`${valItem}-${index}`}
                  ref={refs.current[index]}
                  onBlur={(e) => handleValueBlur(e, index)}
                  rows={textAreaRows}
                  onChange={handleValueChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import logo from './logo.svg';
import './App.css';
import styles from './App.module.css'
import FormMain from './components/FormMain';
import { Flex } from 'antd';
import InputJson from './components/InputJson';
import FormOneC from './components/FormOneC';

function App() {
  return (
    <>
    <Flex className={styles.container} >
      <div className={styles.col}>
        <FormMain />
      </div>
      <div className={styles.col}>
        <InputJson/>
      </div>
    </Flex>
    <div>
<FormOneC/>
    </div>
    </>
  );
}

export default App;

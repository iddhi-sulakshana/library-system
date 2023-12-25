import { useExampleContext } from "../../contexts/ExampleContext";

function Example1() {
  const { example, setExample } = useExampleContext();
  const handleButtonClick = () => setExample(example + 1);
  return (
    <>
      <button onClick={handleButtonClick}>Increase From Component 1</button>
    </>
  );
}

export default Example1;

import React, { useEffect,useState } from "react";
import './Input.css'

const Input = ({ input, label }) => {
  const [repeaterForms, setRepeaterForms] = useState([]);
  // Validate

  const allPatterns = input?.validate?.split("|");

  const pattern_type = allPatterns?.filter((item) => !item.includes(":"));
  const length_type = allPatterns?.filter((item) => item.includes(":"));

  let lengthObj = {};
  let patternObj;
  let pattern;
  if (pattern_type?.[0]) {
    patternObj = pattern_type?.[0];

    if (
      patternObj === "only_letters" ||
      patternObj === "only_letter" ||
      patternObj === "string"
    ) {
      pattern = "^[a-zA-Z ]+$";
    } else if (
      patternObj === "only_numbers" ||
      patternObj === "only_number" ||
      patternObj === "integer"
    ) {
      pattern = "^[0-9]+$";
    } else if (
      patternObj === "only_letters_numbers" ||
      patternObj === "only_letter_number"
    ) {
      pattern = "^[a-zA-Z0-9]+$";
    } else if (patternObj === "email") {
      pattern = "^[\\w\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    } else if (patternObj === "url") {
      pattern =
        "[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";
    }
  }
  if (length_type?.length) {
    const length = length_type?.[0]?.split(":");
    lengthObj[length?.[0] + "Length"] = parseInt(length?.[1]);
  }

  useEffect(() => {
    setRepeaterForms([]);
    input?.type === "repeater" &&
      input?.value.length &&
      input?.value?.map((value, i) => {
        setRepeaterForms((prev) => [
          ...prev,

          Object.keys(input?.repeater_fields).map((key, index) => {
            return (
              <div key={index}>
                <label
                  htmlFor={
                    key + " " + input?.repeater_fields[key]?.html_attr?.id
                  }
                >
                  {input?.repeater_fields[key]?.title}
                </label>
                <input
                  id={key + " " + input?.repeater_fields[key]?.html_attr?.id}
                  className={input?.repeater_fields[key]?.html_attr?.class}
                  type={input?.repeater_fields[key]?.type}
                  name={key}
                  required={input?.repeater_fields[key]?.required}
                  defaultValue={input?.value[i]?.[key]}
                  readOnly={input?.repeater_fields[key]?.readonly}
                  pattern={pattern}
                  {...lengthObj}
                />
              </div>
            );
          }),
        ]);
      });
  }, []);

 
  const { id, ...html_attr } = input?.html_attr;

  delete html_attr?.class;
  const handleRepeater = (e) => {
    e.preventDefault();
    setRepeaterForms((prev) => [
      ...prev,
      Object.keys(input?.repeater_fields).map((key, index) => {
        return (
          <div key={index}>
            <label
              htmlFor={key + " " + input?.repeater_fields[key]?.html_attr?.id}
            >
              {input?.repeater_fields[key]?.title}
            </label>
            <input
              id={key + " " + input?.repeater_fields[key]?.html_attr?.id}
              className={input?.repeater_fields[key]?.html_attr?.class}
              type={input?.repeater_fields[key]?.type}
              name={key}
              required={input?.repeater_fields[key]?.required}
              defaultValue={input?.repeater_fields[key]?.value}
              readOnly={input?.repeater_fields[key]?.readonly}
              pattern={pattern}
              {...lengthObj}
            />
          </div>
        );
      }),
    ]);
  };

  return (
    <div>
      <label htmlFor={label + " " + input?.html_attr?.id}>
        {input?.title}
      </label>
      {input?.type === "textarea" ? (
        <textarea
          id={label + " " + input?.html_attr?.id}
          className={input?.html_attr?.class}
          name={label}
          required={input?.required}
          defaultValue={input?.value}
          readOnly={input?.readonly}
          pattern={pattern}
          {...lengthObj}
          {...html_attr}
        />
      ) : input?.type === "radio" ? (
        <>
          {input?.options.map((option, index) => (
            <span key={index}>
              <input
                id={option?.key + " " + input?.html_attr?.id}
                className={input?.html_attr?.class}
                type={input?.type}
                name={label}
                required={input?.required}
                defaultChecked={input?.default === option?.key}
                readOnly={input?.readonly}
                {...html_attr}
              />
              <label htmlFor={option?.key + " " + input?.html_attr?.id}>
                {option?.label}
              </label>
            </span>
          ))}
        </>
      ) : input?.type === "select" ? (
        <select
          id={label + " " + input?.html_attr?.id}
          className={input?.html_attr?.class}
          name={label}
          required={input?.required}
          defaultValue={input?.default}
          readOnly={input?.readonly}
          {...html_attr}
        >
          {input?.options.map((option, index) => (
            <option key={index} value={option?.key}>
              {option?.label}
            </option>
          ))}
        </select>
      ) : input?.type === "repeater" ? (
        <>
          <button
            type="button"
            id={label + " " + input?.html_attr?.id}
            className={input?.html_attr?.class}
            {...html_attr}
            onClick={handleRepeater}
          >
            +
          </button>
          {repeaterForms.map((form, index) => {
            return form;
          })}
        </>
      ) : (
        <input
          id={label + " " + input?.html_attr.id}
          className={input?.html_attr?.class}
          type={input?.type}
          name={label}
          required={input?.required}
          defaultValue={input?.value}
          readOnly={input?.readonly}
          pattern={pattern}
          {...lengthObj}
          {...html_attr}
        />
      )}
    </div>
  );
};

export default Input;

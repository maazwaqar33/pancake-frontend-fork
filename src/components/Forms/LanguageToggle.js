import React from 'react';

const languages = [
  {
    abbr: 'en',
    name: 'English',
  },
  {
    abbr: 'mi',
    name: 'Māori',
  },
];

const LanguageToggle = props => {
  return (
    <div className="container btn-group">
      {languages.map((lang, key) => {
        return (
          <LangBtn
            key={key}
            state={props.langState}
            langAbbr={lang.abbr}
            langName={lang.name}
            handler={() => {
              props.handler(lang.abbr);
            }}
          />
        );
      })}
    </div>
  );
};

const LangBtn = props => {
  return (
    <a
      onClick={props.handler}
      className={props.state === props.langAbbr ? 'btn active' : 'btn'}
    >
      {props.langName}
    </a>
  );
};

export default LanguageToggle;

import BeautyHtml from '../src/BeautyHtml'

const { DOMParser } = require('@xmldom/xmldom');

describe('BeautyHtml', () => {


  describe('beautify()', () => {
    test('default', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><example version="2.0">
  <head>
    <title>Original Title</title>
  </head>
  <body>
    <element message="Greeting" title="Chapter1">
      <element message="We say good morning in the morning."></element><element message="We say hello at noon."/>
      <element message="We say good evening at night."/>
    </element>
    <element message="Thank" title="Chapter2">
      <element>value</element>
      <element></element>
    </element>
  </body>
</example>`;

      const beautifiedXmlText = new BeautyHtml().beautify(srcXmlText);
      expect(beautifiedXmlText).toBe(`<?xml version="1.0" encoding="utf-8"?>
<example version="2.0">
  <head>
    <title>Original Title</title>
  </head>
  <body>
    <element message="Greeting" title="Chapter1">
      <element message="We say good morning in the morning."></element>
      <element message="We say hello at noon."></element>
      <element message="We say good evening at night."></element>
    </element>
    <element message="Thank" title="Chapter2">
      <element>value</element>
      <element></element>
    </element>
  </body>
</example>
`);
    });
    test('default with external DOMParser', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><example version="2.0">
  <head>
    <title>Original Title</title>
  </head>
  <body>
    <element message="Greeting" title="Chapter1">
      <element message="We say good morning in the morning."></element><element message="We say hello at noon."/>
      <element message="We say good evening at night."/>
    </element>
    <element message="Thank" title="Chapter2">
      <element>value</element>
      <element></element>
    </element>
  </body>
</example>`;

      const beautifiedXmlText = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText);
      expect(beautifiedXmlText).toBe(`<?xml version="1.0" encoding="utf-8"?>
<example version="2.0">
  <head>
    <title>Original Title</title>
  </head>
  <body>
    <element message="Greeting" title="Chapter1">
      <element message="We say good morning in the morning."></element>
      <element message="We say hello at noon."></element>
      <element message="We say good evening at night."></element>
    </element>
    <element message="Thank" title="Chapter2">
      <element>value</element>
      <element></element>
    </element>
  </body>
</example>
`);
    });
    test('indentation', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><element><child></child></element>`;

      const beautifiedXmlText1 = new BeautyHtml().beautify(srcXmlText, {
        indent: ' ',  //1 space characters
      });
      expect(beautifiedXmlText1.split(`\n`)[2].indexOf(`<child>`)).toBe(1);// <child> started at 1

      const beautifiedXmlText2 = new BeautyHtml().beautify(srcXmlText, {
        indent: '  ',  //2 space characters(default)
      });
      expect(beautifiedXmlText2.split(`\n`)[2].indexOf(`<child>`)).toBe(2);// <child> started at 2

      const beautifiedXmlText3 = new BeautyHtml().beautify(srcXmlText, {
        indent: '   ',  //3 space characters
      });
      expect(beautifiedXmlText3.split(`\n`)[2].indexOf(`<child>`)).toBe(3);// <child> started at 3

      const beautifiedXmlText4 = new BeautyHtml().beautify(srcXmlText, {
        indent: '    ',  //4 space characters
      });
      expect(beautifiedXmlText4.split(`\n`)[2].indexOf(`<child>`)).toBe(4);// <child> started at 4

    });
    test('indentation with external DOMParser', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><element><child></child></element>`;

      const beautifiedXmlText1 = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        indent: ' ',  //1 space characters
      });
      expect(beautifiedXmlText1.split(`\n`)[2].indexOf(`<child>`)).toBe(1);// <child> started at 1

      const beautifiedXmlText2 = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        indent: '  ',  //2 space characters(default)
      });
      expect(beautifiedXmlText2.split(`\n`)[2].indexOf(`<child>`)).toBe(2);// <child> started at 2

      const beautifiedXmlText3 = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        indent: '   ',  //3 space characters
      });
      expect(beautifiedXmlText3.split(`\n`)[2].indexOf(`<child>`)).toBe(3);// <child> started at 3

      const beautifiedXmlText4 = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        indent: '    ',  //4 space characters
      });
      expect(beautifiedXmlText4.split(`\n`)[2].indexOf(`<child>`)).toBe(4);// <child> started at 4

    });
    test('useSelfClosingElement:true', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><element><child></child></element>`;
      const beautifiedXmlText = new BeautyHtml().beautify(srcXmlText, {
        useSelfClosingElement: true,
      });
      expect(beautifiedXmlText).toContain(`<child />`);
    });
    test('useSelfClosingElement:true  with external DOMParser', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><element><child></child></element>`;
      const beautifiedXmlText = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        useSelfClosingElement: true,
      });
      expect(beautifiedXmlText).toContain(`<child />`);
    });
    test('useSelfClosingElement:false', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><element><child></child></element>`;
      const beautifiedXmlText = new BeautyHtml().beautify(srcXmlText, {
        useSelfClosingElement: false,
      });
      expect(beautifiedXmlText).toContain(`<child></child>`);
    });
    test('useSelfClosingElement:false  with external DOMParser', () => {
      const srcXmlText = `<?xml version="1.0" encoding="utf-8"?><element><child></child></element>`;
      const beautifiedXmlText = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        useSelfClosingElement: false,
      });
      expect(beautifiedXmlText).toContain(`<child></child>`);
    });

    test('CDATA section', () => {
      const srcXmlText = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<object><foo><![CDATA[ < > & ]]></foo>
</object>`;
      const beautifiedXmlText = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        useSelfClosingElement: false,
      });
      expect(beautifiedXmlText).toContain(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<object>
  <foo><![CDATA[ < > & ]]></foo>
</object>`);
    });

    test('CDATA section with tabs and newlines', () => {
      const srcXmlText = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<object>
\t<![CDATA[
\t\t<?xml version="1.0"?>
\t\t<document>
\t\t\tHello D & D
\t\t</document>
\t]]>
</object>`;
      const beautifiedXmlText = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        useSelfClosingElement: false,
      });
      expect(beautifiedXmlText).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<object><![CDATA[
\t\t<?xml version="1.0"?>
\t\t<document>
\t\t\tHello D & D
\t\t</document>
\t]]></object>
`);
    });

    test('Text and CDATA section mixed', () => {
      const srcXmlText = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<object>
<foo>Here is a CDATA section: <![CDATA[ < > & ]]> with all kinds of unescaped text.</foo></object>`;
      const beautifiedXmlText = new BeautyHtml({ parser: DOMParser }).beautify(srcXmlText, {
        useSelfClosingElement: false,
      });
      console.log(beautifiedXmlText);
      expect(beautifiedXmlText).toBe(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<object>
  <foo>Here is a CDATA section: <![CDATA[ < > & ]]> with all kinds of unescaped text.</foo>
</object>
`);
    });
  });


});

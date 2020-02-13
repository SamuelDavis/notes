<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Testing React</h1>
    </template>
    <section>
      <h2>UI Components and Implementation Details</h2>
      <article>
        <notes-quote href="https://kentcdodds.com/blog/testing-implementation-details" source="Kent C. Dodds">
          <p>Implementation details are things which users of your code will not typically use, see, or even know about.</p>
          <div>
            <p>There are two distinct reasons that it's important to avoid testing implementation details. Tests which test implementation details:</p>
            <ol>
              <li>Can break when you refactor application code. <b>False negatives</b></li>
              <li>May not fail when you break application code. <b>False positives</b></li>
            </ol>
          </div>
        </notes-quote>
        <notes-quote href="https://kentcdodds.com/blog/why-i-never-use-shallow-rendering" source="Kent C. Dodds">
          <p>With shallow rendering, I can refactor my component's implementation and tests break. With shallow rendering, I can break my application and my tests say everything's still working.</p>
        </notes-quote>
      </article>
      <article>
        <h3>How do different kinds of users interact with your code?</h3>
        <h5>What should you be testing for?</h5>
        <ul>
          <li><em>The Developer</em>: rendering the component with props.</li>
          <li><em>The End-User</em>: querying and interacting with the rendered result.</li>
        </ul>
        <h5>What should you not be testing for?</h5>
        <ul>
          <li>State</li>
          <li>Component names</li>
          <li>CSS classes/selectors</li>
        </ul>
      </article>
    </section>
    <section>
      <h2>React Testing Library</h2>
      <article>
        <h3>Caveats</h3>
        <ul>
          <li>React Testing Library <em>does not load css</em>, so any style-related behavior (eg. display: none;) cannot be tested.</li>
          <li><notes-citation href="https://testing-library.com/docs/react-testing-library/setup">Setup RTL correctly</notes-citation>. <em>Override RTL's render to automatically wrap your components in their providers</em>.</li>
        </ul>
      </article>
      <article>
        <h3>Example</h3>
        <notes-outline :label="rtlComponentExample.label">
          <pre><notes-code syntax="javascript xml">{{rtlComponentExample.content}}</notes-code></pre>
        </notes-outline>
        <notes-outline :label="rtlTestExample.label">
          <pre><notes-code syntax="javascript xml">{{rtlTestExample.content}}</notes-code></pre>
        </notes-outline>
      </article>
    </section>
    <section>
      <h2>Jest (...Testing Library)</h2>
      <article>
        <h3>Caveats</h3>
        <p>Calls to <notes-code syntax="javascript">jest.mock</notes-code> are hoisted above <notes-code syntax="javascript">import</notes-code> statements. Normally, the JS interpreter would then hoist the <notes-code syntax="javascript">import</notes-code> statements above the mock calls, but because the <notes-code syntax="javascript">import</notes-code> statements are transpiled to <notes-code syntax="javascript">const dep = require("dev")</notes-code> statements, the mock can override the dependency.</p>
      </article>
      <article>
        <h3>Example</h3>
        <notes-outline :label="jestMockExample.label">
          <pre><notes-code syntax="javascript xml">{{jestMockExample.content}}</notes-code></pre>
        </notes-outline>
        <notes-outline :label="jestTestExample.label">
          <pre><notes-code syntax="javascript xml">{{jestTestExample.content}}</notes-code></pre>
        </notes-outline>
      </article>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesQuote from '../../components/NotesQuote'
  import NotesCode from '../../components/NotesCode'
  import NotesCitation from '../../components/NotesCitation'
  import NotesOutline from '../../components/NotesOutline'

  export default {
    components: {
      NotesPaper,
      NotesQuote,
      NotesCode,
      NotesCitation,
      NotesOutline
    },
    data() {
      return {
        jestMockExample: {label: '/__mocks__/axios.js', content: `
import {mockUnsplashImages} from "../services/unsplash";

const client = {
    get: jest.fn(() => {
        return Promise.resolve({data: {results: mockUnsplashImages}})
    })
};

export default {
    create: config => client,
    ...client
}
`
},
        jestTestExample: {label: '/__tests__/unsplash.test.js', content: `
import unsplash, {UNSPLASH_CONFIG} from "./unsplash";
import mockAxios from "axios"

const mockUnsplashImages = [
  //...
];

it("Calls axios and returns images", async () => {
    // Customize the mock implementation of .get for this test.
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data: {results: mockUnsplashImages}
    }));
    const term = "term";
    const images = await unsplash(term);
    expect(images).toBe(mockUnsplashImages);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(UNSPLASH_CONFIG.BASE_URL + UNSPLASH_CONFIG.PHOTOS_PATH, {
        params: {
            ...UNSPLASH_CONFIG.DEFAULT_PARAMS,
            query: term
        }
    })
});

`
        },
        rtlComponentExample: {label: '/components/Accordion.js', content: `
import React, {useState} from "react";

export default function ({items = [], ...rest}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ul {...rest}>
            <li>
                <button data-testid="accordion-toggle"
                        onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'}</button>
            </li>
            {items.map((item, i) => <li key={i} style={{display: isOpen ? undefined : 'none'}}>
                <label>{item.title}</label>
                <p>{item.contents}</p>
            </li>)}
        </ul>
    )
}

`
        },
        rtlTestExample: {label: '/components/Accordion.test.js', content: `
import React from "react";
import Accordion from "./Accordion";
import {fireEvent, render} from "@testing-library/react";

describe('Accordion', () => {
    it('Renders items by default', () => {
        const items = [{
            text: "Foo",
            contents: "Bar",
        }, {
            text: "Fiz",
            contents: "Buz",
        }];
        const {getByTestId, getByText} = render(<Accordion items={items}/>);
        const accordionToggle = getByTestId("accordion-toggle");

        // Confirm the accordion has a toggle
        expect(accordionToggle).toBeVisible();

        // Confirm none of the accordion items are visible
        items.forEach(({contents}) => {
            expect(getByText(contents)).not.toBeVisible()
        });

        // Trigger Click event on accordion toggle
        fireEvent.click(accordionToggle);

        // Confirm all of the accordion items are visible
        items.forEach(({contents}) => {
            expect(getByText(contents)).toBeVisible()
        });
    });

    /*
    Each call to snapshot registers a snapshot scoped to the test specifically,
    snapshots in one test will not interfere with another test.
     */
    test("closed snapshot", () => {
        const {asFragment} = render(<Accordion items={items}/>);
        expect(asFragment()).toMatchSnapshot()
    });

    test("open snapshot", () => {
        const {getByTestId, asFragment} = render(<Accordion items={items}/>);
        const accordionToggle = getByTestId("accordion-toggle");
        fireEvent.click(accordionToggle);
        expect(asFragment()).toMatchSnapshot()
    });
});

`
        },
      }
    }
  }
</script>

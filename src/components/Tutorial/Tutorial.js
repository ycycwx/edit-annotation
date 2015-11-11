/**
 * @file Tutorial
 * @author ycy
 */

import React, {Component} from 'react';
import Section from './Section';

class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                {
                    name: 'nav',
                    module: [
                        {
                            text: 'Navbar: navigator.',
                            url: 'src/images/navbar.jpg'
                        }
                    ]
                },
                {
                    name: 'home',
                    // position: 'right',
                    module: [
                        {
                            text: 'Home: simple explain.',
                            url: 'src/images/home.jpg'
                        }
                    ]
                },
                {
                    name: 'crawler',
                    module: [
                        {
                            text: 'Crawler: 1. search entity here.',
                            url: 'src/images/crawler1.jpg'
                        },
                        {
                            text: 'Crawler: 2. input entity name',
                            url: 'src/images/crawler2.jpg'
                        },
                        {
                            text: 'Crawler: 3. show log in div',
                            url: 'src/images/crawler3.jpg'
                        }
                    ]
                },
                {
                    name: 'Editor',
                    // position: 'right',
                    module: [
                        {
                            text: 'Editor: 1. upload json file here.',
                            url: 'src/images/editor1.jpg'
                        },
                        {
                            text: 'Editor: 2. choose entity here.',
                            url: 'src/images/editor2.jpg'
                        },
                        {
                            text: 'Editor: 3. click combine to group selected items.',
                            url: 'src/images/editor3.jpg'
                        },
                        {
                            text: 'Editor: 4. click button to decompose selected group.',
                            url: 'src/images/editor4.jpg'
                        },
                        {
                            text: 'Editor: 5. click save to save result of manually audit',
                            url: 'src/images/editor5.jpg'
                        }
                    ]
                },
            ]
        }
    }

    render() {
        let {sections} = this.state;

        return (
            <div>
                {
                    sections.map((item, idx) => {
                        return (
                            <Section
                                key={idx}
                                name={item.name}
                                module={item.module}
                                position={item.position || 'left'} />
                        );
                    })
                }
            </div>
        );
    }
}

export default Tutorial;

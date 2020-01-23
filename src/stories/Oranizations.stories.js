import React from 'react';
import Organizations from '../screens/Organizations';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, array } from '@storybook/addon-knobs';

const mockOrgs = [{address: "1"},{address: "2"},{address: "3"}];

export const mainOrgs = () => (
    <Organizations organizations={mockOrgs} />
);

storiesOf('ORG ID/Grid item', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => {

        const props = {
            mockOrgs
        };

        return <div style={{ minHeight: 600, minWidth: 600 }}>{storyFn({ props })}</div>;
    })
    .add('custom with knob', ({ props }) => {
        console.log('PROPS', props);

        return (
            <Organizations {...props} />
        )
    });


export default {
    title: 'Organizations',
    component: mainOrgs,
};

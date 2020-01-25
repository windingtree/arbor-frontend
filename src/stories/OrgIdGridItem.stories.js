import React from 'react';
import OrgIdGridItem from "../components/OrgIdGridItem";
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';

export const mainOrgId = () => (
    <OrgIdGridItem name={"PRE Kudrenko Oleg"} address={"0xD2B2"} isSub={false} subs={3} trustLevel={4} />
);

export const subOrgId = () => (
    <OrgIdGridItem name={"Hotel California"} address={"0xAAAA"} isSub={true} trustLevel={3} segment={'Hotels'} />
);

export const customOrgId = () => (
    <OrgIdGridItem name={"Custom OrgId"} address={"0xC1310"} isSub={false} subs={3} trustLevel={4} />
);


storiesOf('ORG ID/Grid item', module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => {
        const name = text('name', "Custom OrgId");
        const address= text('address', "0xC1310");
        const isSub = boolean('isSub', false);
        const subs = number('subs', 3);
        const trustLevel = number('trustLevel', 4);

        const props = {
            name,
            address,
            isSub,
            subs,
            trustLevel
        };

        return <div style={{ minHeight: 600, minWidth: 600 }}>{storyFn({ props })}</div>;
    })
    .add('custom with knob', ({ props }) => {
        console.log('PROPS', props);

        return (
            <OrgIdGridItem {...props} />
        )
    });


export default {
    title: 'OrgId Grid Item',
    component: mainOrgId,
};

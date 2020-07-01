import React from "react";

import {Container, Typography, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import colors from '../styles/colors';
import backgroundSvg from '../assets/SvgComponents/tos-bg.svg'

const styles = makeStyles({
  mainWrapper: {
    backgroundImage: `url(${backgroundSvg})`
  },
  mainContainer: {
    marginBottom: '160px',
    ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
      marginBottom: '30px'
    }
  },
  mainTitle: {
    fontSize: '40px',
    lineHeight: '52px',
    color: colors.greyScale.darkest,
    marginTop: '123px'
  },
  title: {
    fontSize: '32px',
    lineHeight: '44px',
    color: colors.greyScale.darkest,
    marginTop: '50px'
  },
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
  list: {
    marginTop: '20px'
  },
  listDot: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    content: '""',
    backgroundColor: colors.secondary.peach,
    fontWeight: 'bold',
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '12px',
    border: '12px',
  },
  listItem: {
    position: 'relative',
    marginBottom: '11px',
  },
  listTexts: {
    marginLeft: '23px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
  },
});

export default function TOS(props) {
  const classes = styles();
  return (
    <Container className={classes.mainWrapper}>
      <Grid container className={classes.mainContainer}>
        <Grid item xs={12} md={9}>
          <Typography className={classes.mainTitle}>Winding Tree Marketplace Terms of Use</Typography>
          <Typography className={classes.paragraph}>By accessing the website at https://marketplace.windingtree.com, you are agreeing to be
            bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for
            compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited
            from
            using or accessing this site. The materials contained in this website are protected by applicable copyright
            and
            trademark law.</Typography>
          <Typography className={classes.title}>Use License</Typography>
          <Typography className={classes.paragraph}>Permission is granted to temporarily download one copy of the
            materials
            (information or software) on Winding Tree Marketplace’s website for personal, non-commercial transitory viewing only. This is
            the
            grant of a license, not a transfer of title, and under this license you may not:</Typography>
          <Grid item>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <span className={classes.listDot}/>
                <Typography className={classes.listTexts}>modify or copy the materials;</Typography>
              </li>
              <li className={classes.listItem}>
                <span className={classes.listDot}/>
                <Typography className={classes.listTexts}>use the materials for any commercial purpose, or for any
                  public
                  display (commercial or non-commercial);</Typography>
              </li>
              <li className={classes.listItem}>
                <span className={classes.listDot}/>
                <Typography className={classes.listTexts}>attempt to decompile or reverse engineer any software
                  contained
                  on Winding Tree Marketplace’s website;</Typography>
              </li>
              <li className={classes.listItem}>
                <span className={classes.listDot}/>
                <Typography className={classes.listTexts}>remove any copyright or other proprietary notations from the
                  materials;</Typography>
              </li>
              <li className={classes.listItem}>
                <span className={classes.listDot}/>
                <Typography className={classes.listTexts}>transfer the materials to another person or "mirror" the
                  materials on any other server.</Typography>
              </li>
            </ul>
            <Typography className={classes.paragraph}>This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by Winding Tree Marketplace at any time. Upon terminating your viewing of these
              materials or upon the termination of this license, you must destroy any downloaded materials in your
              possession whether in electronic or printed format.</Typography>
          </Grid>
          <Typography className={classes.title}>Disclaimer</Typography>
          <Typography className={classes.paragraph}>The materials on Winding Tree Marketplace's website are provided on an 'as is' basis.
            Winding Tree Marketplace
            makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
            without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
            or
            non-infringement of intellectual property or other violation of rights.</Typography>
          <Typography className={classes.paragraph}>Further, Winding Tree Marketplace does not warrant or make
            any representations concerning the accuracy, likely results, or reliability of the use of the materials on
            its
            website or otherwise relating to such materials or on any sites linked to this site.</Typography>
          <Typography className={classes.title}>Limitations</Typography>
          <Typography className={classes.paragraph}>In no event shall Winding Tree Marketplace or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit, or due to business interruption) arising
            out
            of the use or inability to use the materials on Winding Tree Marketplace's website, even if Winding Tree Marketplace or its authorized
            representative
            has been notified orally or in writing of the possibility of such damage.</Typography>
          <Typography className={classes.paragraph}>Because some jurisdictions do not
            allow limitations on implied warranties, or limitations of liability for consequential or incidental
            damages,
            these limitations may not apply to you.</Typography>
          <Typography className={classes.title}>Accuracy of materials</Typography>
          <Typography className={classes.paragraph}>The materials appearing on Winding Tree Marketplace's website could include technical,
            typographical, or photographic errors. Winding Tree Marketplace does not warrant that any of the materials on its website are
            accurate, complete or current. Winding Tree Marketplace may make changes to the materials contained on its website at any time
            without notice. However, Winding Tree Marketplace does not make any commitment to update the materials.</Typography>
          <Typography className={classes.title}>Links</Typography>
          <Typography className={classes.paragraph}>Winding Tree Marketplace has not reviewed all of the sites linked to its website and is
            not
            responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement
            by
            Winding Tree Marketplace of the site. Use of any such linked website is at the user's own risk.</Typography>
          <Typography className={classes.title}>Modifications</Typography>
          <Typography className={classes.paragraph}>Winding Tree Marketplace may revise these terms of service for its website at any time
            without notice. By using this website you are agreeing to be bound by the then current version of these
            terms
            of
            service.</Typography>
          <Typography className={classes.title}>Governing Law</Typography>
          <Typography className={classes.paragraph}>These terms and conditions are governed by and construed in
            accordance
            with the laws of Suite 23 Portland House, Glacis Road, Gibraltar GX11 1AA and you irrevocably submit to the
            exclusive jurisdiction of the courts in that State or location.</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

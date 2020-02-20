import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";
import { Container, Grid, Typography } from "@material-ui/core";
import CardsGridList from "../../../components/CardsGridList";
import OrgsGridItem from "../../../components/OrgsGridItem";
import AddSubOrgCard from "../../../components/AddSubOrgCard";
import React from "react";

const styles = makeStyles({
  subsWrapper: {
    width: '100%',
    backgroundColor: colors.greyScale.moreLighter
  },
  subsContent: {
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  subsTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
});


function SubOrganizations(props) {
  const classes = styles();
  const { organization: { orgid }, subs, canManage } = props;

  return (
    <div className={classes.subsWrapper}>
      <Container className={classes.subsContent}>
        <Typography variant={'h6'} className={classes.subsTitle}>
          Organizational units ({subs.length})
        </Typography>
        <CardsGridList spacing={2}>
          {
            subs.map((subOrg, index) => {
              return (
                <Grid lg={3} sm={4} xs={10} item key={index.toString()}>
                  <OrgsGridItem
                    orgid={subOrg.orgid}
                    isSub={!!subOrg.parent}
                    orgidType={subOrg.orgidType}
                    entityName={subOrg.parent.name}
                    entityTrustLevel={subOrg.parent.proofsQty}
                    name={subOrg.name}
                    canManage={canManage}
                  />
                </Grid>
              )
            })
          }
          {
            canManage && (
              <Grid item style={{ width: '264px' }}>
                <AddSubOrgCard parentOrgid={orgid}/>
              </Grid>
            )
          }
        </CardsGridList>
      </Container>
    </div>
  )
}

export default SubOrganizations;

import React, { useEffect } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchOrganizationInfo, fetchOrganizationSubsInfo, selectItem, selectSubs } from '../../ducks/fetchOrganizationInfo';
import { rewriteOrgidJson } from '../../ducks/wizard';
import history from '../../redux/history';
import TopNavigation from "./Components/TopNavigation";
import Agents from "./Components/Agents";
import TodoList, { getTodo } from "./Components/TodoList";
import Info from "./Components/Info";
import SubOrganizations from "./Components/SubOrganizations";

function Organization(props) {
  const id = history.location.state ? history.location.state.id : history.location.pathname.split('/')[2];
  console.log('%cOrganization(props)', 'background-color:yellow; color: black', id);
  const canManage = history.location.pathname !== `/organization/${id}`;
  const { organization, subs } = props;
  const subsidiaries = _.get(organization, 'subsidiaries', []);
  const todos = getTodo(organization);

  useEffect(() => {
    console.log('%cuseEffect, [id]', 'background-color:yellow; color: black', id);
    console.log(`%cprops.fetchOrganizationInfo({ id });`, 'background-color:darkorange; color: black', id);
    props.fetchOrganizationInfo({ id });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('%cuseEffect, [id, subsidiaries]', 'background-color:yellow; color: black', `[${id}, subsidiaries<length: ${subsidiaries ? subsidiaries.length : 0}>]`);
    if (subsidiaries && subsidiaries.length) {
      console.log(`%cprops.fetchOrganizationSubsInfo({ id })`, 'background-color:darkorange; color: black', id);
    }
    subsidiaries && subsidiaries.length && props.fetchOrganizationSubsInfo({ id });
  }, [id, subsidiaries]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <TopNavigation organization={organization} canManage={canManage} todos={todos}/>
      <Info organization={organization} canManage={canManage}/>
      {subs && subs.length > 0 && <SubOrganizations organization={organization} subs={subs} canManage={canManage} />}
      {canManage && <Agents organization={organization}/>}
      {canManage && <TodoList organization={organization}/>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    organization: selectItem(state),
    subs: selectSubs(state)
  }
};

const mapDispatchToProps = {
  fetchOrganizationInfo,
  fetchOrganizationSubsInfo,
  rewriteOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);

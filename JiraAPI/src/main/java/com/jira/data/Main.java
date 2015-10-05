package com.jira.data;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.List;

import com.atlassian.jira.rest.client.JiraRestClient;
import com.atlassian.jira.rest.client.domain.BasicProject;
import com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;
import com.atlassian.util.concurrent.Promise;

import net.rcarz.jiraclient.BasicCredentials;
import net.rcarz.jiraclient.Issue;
import net.rcarz.jiraclient.JiraClient;
import net.rcarz.jiraclient.JiraException;
import net.rcarz.jiraclient.RestException;
import net.sf.json.JSON;
import net.sf.json.JSONObject;

public class Main {
	public static void main(String[] args) {
		try {
			BasicCredentials creds = new BasicCredentials("VIDDAAM",
					"Aug2015Pswrd");
			JiraClient jiraClient = new JiraClient(
					"https://jira.pearsoncmg.com/jira", creds);
			//JSON jsonString = jiraClient.getRestClient().get(
				//	"/rest/api/2/project");
			// System.out.println(jsonString);

			//JSONObject jsonObject = (JSONObject) jsonString;

			//List<JSONObject> versionList = (List<JSONObject>) jsonObject
					//.get("versions");

			//for (JSONObject version : versionList) {
				// System.out.println(version.get("id") + "   " +
				// version.get("name") + "  "+version.get("releaseDate"));
			//}

			// System.out.println(jsonObject.get("versions"));
			//JSON test = jiraClient.getRestClient().get(
					//"/rest/api/2/project/RUBYSL/versions");
			// System.out.println(test);
			//for (JSONObject version : (List<JSONObject>) test) {
				// System.out.println(version.get("id") + "   " +
				// version.get("name") + "  "+version.get("releaseDate"));
			//}

			/*
			 * JSON relatedIssueCounts = jiraClient.getRestClient().get(
			 * "/rest/api/2/version/21232/relatedIssueCounts");
			 * System.out.println(relatedIssueCounts);
			 * 
			 * JSON unresolvedIssueCount = jiraClient.getRestClient().get(
			 * "/rest/api/2/version/21232/unresolvedIssueCount");
			 * System.out.println(unresolvedIssueCount);
			 * 
			 * JSON version = jiraClient.getRestClient().get(
			 * "/rest/api/2/project/RUBYSL/statuses");
			 * System.out.println(version);
			 * 
			 * JSON components = jiraClient.getRestClient().get(
			 * "/rest/api/2/project/RUBYSL/components");
			 * System.out.println(components);
			 */

			/*
			 * JSON allopenissues = jiraClient.getRestClient().get(
			 * "/rest/api/2/issues/RUBYSL-2819?filter=allopenissues");
			 * System.out.println(allopenissues);
			 */

			/*
			 * JSON projects = jiraClient.getRestClient().get(
			 * "/rest/api/2/project"); //System.out.println(projects); for
			 * (JSONObject project : (List<JSONObject>)projects) {
			 * System.out.println(project.get("key") + "   " +
			 * project.get("name")); }
			 */

			/*
			 * JSON dashboard = jiraClient.getRestClient().get(
			 * "/rest/api/2/dashboard"); System.out.println(dashboard);
			 */

			/*
			 * JSON dashboard = jiraClient.getRestClient().get(
			 * "/rest/greenhopper/1.0/rapidview");
			 * System.out.println(dashboard);
			 */
			// Rapid View : { "id": 3139, "name": "EDS – Ruby (MLP)", "canEdit":
			// false, "sprintSupportEnabled": true, "showDaysInColumn": false }

			/*
			 * JSON sprints = jiraClient.getRestClient().get(
			 * "/rest/greenhopper/1.0/sprintquery/3139");
			 * System.out.println(sprints);
			 */
			// { "id": 40366, "sequence": 40366, "name": "Sprint 44", "state":
			// "ACTIVE", "linkedPagesCount": 0 }

			/*
			 * JSON issues = jiraClient.getRestClient().get(
			 * "/rest/greenhopper/1.0/sprint/40366/issues?rapidViewId=3139&expandIssues=false"
			 * ); System.out.println(issues);
			 */

			/*
			 * JiraRestClient newClient = new
			 * AsynchronousJiraRestClientFactory()
			 * .createWithBasicHttpAuthentication(new
			 * URI("https://jira.pearsoncmg.com/jira"), "VIDDAAM",
			 * "Aug2015Pswrd"); Promise<Iterable<BasicProject>>
			 * s=newClient.getProjectClient().getAllProjects();
			 * System.out.println(s);
			 */

			// https://jira.pearsoncmg.com/jira/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=3139&sprintId=40366

			/*
			 * URI uri = new URI(
			 * "https://jira.pearsoncmg.com/jira/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=3139&sprintId=40366"
			 * );
			 * 
			 * JSON sprints = jiraClient.getRestClient().get(uri);
			 * System.out.println(sprints);
			 */

			URI uri = new URI(
					"https://jira.pearsoncmg.com/jira/rest/greenhopper/1.0/rapid/charts/releaseburndownchart?rapidViewId=19805&versionId=26802");
			double allissuecount=0;
			double completedcount=0;
			double incompletedcount=0;

			JSON sprintsForVersion = jiraClient.getRestClient().get(uri);
			JSONObject jsonObject = (JSONObject) sprintsForVersion;
			for (JSONObject sprint : (List<JSONObject>)jsonObject.get("sprints")) {
				URI uri2 = new URI("https://jira.pearsoncmg.com/jira/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=19805&sprintId="+sprint.get("id"));
				JSON sprintsDetails = jiraClient.getRestClient().get(uri2);
				JSONObject sprintsDetailsObj = (JSONObject) sprintsDetails;
				
				JSONObject contentObj=(JSONObject) sprintsDetailsObj.get("contents");
				JSONObject allIssuesEstimateSumObj=(JSONObject) contentObj.get("allIssuesEstimateSum");
				JSONObject completedIssuesEstimateSum=(JSONObject) contentObj.get("completedIssuesEstimateSum");
				
				double allcount = (Double) allIssuesEstimateSumObj.get("value");
				double completedcount2 = (Double) completedIssuesEstimateSum.get("value");
				
				allissuecount = allissuecount + allcount;
				completedcount = completedcount+ completedcount2;
				
				
			}
			
			System.out.println(completedcount);
			System.out.println(allissuecount-completedcount);
			
		} catch (RestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

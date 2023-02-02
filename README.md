Docker Image compatible with tests can be found at: https://dev.azure.com/polymathlabs-ipd/ipd-client-ims-pkg/_git/ims-qa-docker

To run all the tests at once with cucumber change path in terminal to: ../ims-mr/packages/ims-qa
then type this command in terminal: npm test src

Many tests may fail due to problems with getting stuck in loading screen, or specific buttons randomly not triggering any actions when clicked ( till they get fixed).

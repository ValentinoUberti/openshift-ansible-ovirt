## Ansible Openshift UPI installer on oVirt

Lab setup:

![alt text](https://raw.githubusercontent.com/ValentinoUberti/haproxy-dnsmasq-configurator-for-openshift-upi/master/files/OvirtLabV2.png)

# THIS IS A WORKING PROJECT! #

You need 2 VMs (bastion and loadbalancer) with two network interfaces: one for internet access and one for internal comunications.

I used Fedora 31

For openshift cluster create at least 6 vms (1 bootstrap, 3 master and at least 2 workers)

Create a new logical network in oVirt (here called 'openshift_net')

Set the mac address of loadbalancer and openshift nodes in vars/vars.yaml 

Get an openshit pullSecret on  https://cloud.redhat.com/openshift/install  -> Run on Bare Metal

Set the pullSecret in vars/vars.yaml

Download and install Fedora31 Server on both Bastion and LoadBalancer VM
Create ssh keys on bastion and exchange the keys with LoadBalancer VM
Ensure current user is in the wheel group without need a password for privilege escalation

run: ansible-playbook main.yaml for setup all the machines from scratch
run: ansible-playbook main.yaml -e 'skip_download=yes' from avoiding download of initramfs, kernel and Red Hat CoreOS image

Pxe boot all the cluster machines and select 1 bootstrap, 3 master and all the remaing workers)

Watch a movie




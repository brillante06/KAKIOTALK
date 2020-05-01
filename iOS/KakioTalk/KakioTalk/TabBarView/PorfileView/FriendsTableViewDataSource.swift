//
//  FriendsTableViewDataSource.swift
//  KakioTalk
//
//  Created by 신한섭 on 2020/05/01.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class FriendsTableViewDataSource: NSObject, UITableViewDataSource {
    
    private(set) var userManager = UserManager()
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return userManager.usersCount(at: section)
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return userManager.sectionCount()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "ProfileCell") as? FriendsTableViewCell else {return UITableViewCell()}
        cell.configuration(user: userManager.userInfo(at: indexPath))
        if indexPath.section == 0 {
            cell.configureFontSize(title: 25, status: 20)
        }
        return cell
    }
}
